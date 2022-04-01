
import * as vscode from 'vscode';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmdirSync } from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('njs2ng.class2interface', async () => {

		const upToPairParentheses = [
			'@PrimaryGeneratedColumn',
			'@Unique',
			'@Check',
			'@Entity',
			'@Column',
			'@OneToOne',
			'@OneToMany',			
			'@ManyToOne',
			'@ManyToMany',			
			'@JoinTable',
			'@JoinColumn',
			'@BeforeInsert',
			'@Expose',
			'@ApiProperty',
			'@Length',
		];

		const upToPairCurlyBracket = [
			'async',
		];
		function gg(s: string):string {
			return '****';
		}

		function prepareRegExes(content: string, toInterface: boolean): string {

			const doubleQuotationRegEx = /"/g;
			const typeOrmRegEx = /import([^;]+)['|"]typeorm['|"]( *);/g;
			const publicConstructorRegEx = /public +constructor([^}]+)}/g;
			const constructorRegEx = /constructor([^}]+)}/g;
			const allAsStarRegEx = /import( *)\*( *)([^;]+);/g
			const extendsBaseEntityRegEx = /extends( *)BaseEntity/g;			
			content = content.replace(doubleQuotationRegEx, "'");
			content = content.replace(typeOrmRegEx, '');
			content = content.replace(publicConstructorRegEx, '');
			content = content.replace(constructorRegEx, '');
			content = content.replace(extendsBaseEntityRegEx, '');

			const exception1 = /:( *)HttpStatus/g;			
			content = content.replace(exception1, ': number');

			if (toInterface) {
				const classesRegEx = /export *class/g;								
				const publicRegex = /^\s*public\s*/gm;
				const equalInitValuesRegEx = /\s*=.*;/g;
				const methodsRegEx = /\(\)\:.*\{(.([^}]+))\}/gs;
				
				content = content.replace(classesRegEx, 'export interface');				
				content = content.replace(publicRegex, '  ');
				content = content.replace(equalInitValuesRegEx, ';');
				content = content.replace(methodsRegEx, function (match, capture) { 
					const innerMethodRegEx = / \{(.([^}]+))\}/gs;
					return match.replace(innerMethodRegEx, ';');
				});
			}			

			const allAsStarMatchArr = content.match(allAsStarRegEx);
			if (allAsStarMatchArr) {
				allAsStarMatchArr.forEach((v, i) => {
					if (!v.includes('.entity') && !v.includes('.enum')) {
						content = content.replace(allAsStarMatchArr[i], '');
					}
				});
			}

			return content;
		}		
		function checkCharByChar(content: string): string
		{
			let result = '';
			for (let j = 0; j < content.length; j++) {
				const remained = content.substr(j);
				let newIndex = -1;

				upToPairParentheses.forEach(element => {
					if (newIndex < 0 && remained.startsWith(element)) {
						newIndex = deleteUpToPair(remained, '(', ')');
					}
				});

				upToPairCurlyBracket.forEach(element => {
					if (newIndex < 0 && remained.startsWith(element)) {
						newIndex = deleteUpToPair(remained, '{', '}');	
					}
				});				

				if (newIndex > 0) {
					j = j + newIndex;
					continue;
				} else {
					result += content.substr(j, 1);
				}				
			  }
			  return result;
		}
		function deleteUpToPair(content: string, start: string, end: string):number{
			let found = false;
			let foundNumber = 0;
			let finalIndex = 0;

			for (let j = 0; j < content.length; j++) {
				if (content.substr(j, 1) === start) { found = true; foundNumber++ }
				if (content.substr(j, 1) === end && foundNumber > 0) { foundNumber-- }
				if (found && foundNumber === 0) {
					finalIndex = j + 1;
					break;
				}		
			}
			return finalIndex;
		}
		function deleteUpToPairAndMore(content: string, start: string, end: string, more: string):string{
			let found = false;
			let foundNumber = 0;
			let finalIndex = 0;

			for (let j = 0; j < content.length; j++) {
				if (found && foundNumber === 0) {
					if (content.substr(j, 1) === more) {
						finalIndex = j + 1;
						break;
					}
				} else {
					if (content.substr(j, 1) === start) { found = true; foundNumber++ }
					if (content.substr(j, 1) === end && foundNumber > 0) { foundNumber-- }
				}
			}
			return content.substr(finalIndex);
		}	
		function prepareImports(content: string): string {
			const importCommonRegEx = /import( *)\{([^;]+);/g;
			const importCommons = content.match(importCommonRegEx);			
			content = content.replace(importCommonRegEx, '');
			let newImportCommons = '';

			if (importCommons) {
				importCommons.forEach(importCommon => {
					const betweenBrackets = /\{([^\}]+)\}/;
					const segments = importCommon.match(betweenBrackets);
					const newSegments: string[] = [];
					if (segments) {
						const segmentsArr = segments[0].substring(1, segments[0].length-1).split(',');
						segmentsArr.forEach(segment => {
							segment = segment.trim();
							const isThere = checkImportSegment(segment, content);
							if (isThere) {
								newSegments.push(isThere);
							}						 	
						});
						if(newSegments.length) {
							importCommon.replace(betweenBrackets, '{' + newSegments.join(',') + '}');
							newImportCommons += (importCommon + '\n');
						}
					}
				});
			}

			content = newImportCommons + content;
			return content;
		}
		function checkImportSegment(segment: string, content: string): string | null {
			if (content.includes(segment)) {
				return segment;
			} else {
				return null;
			}						
		}
		function prepareCommons(content: string): string {
			const doubleSchema = /\"(.*)schema/gm;
			const singleSchema = /\'(.*)schema/gm;	

			content = content.replace(doubleSchema, '"@commons/schema');
			content = content.replace(singleSchema, "'@commons/schema");
			return content;
		}		
		function formatter(content: string): string {
			const extraReturns1 = /^(?:[\t ]*(?:\r?\n|\r))+/gm;
			const extraReturns2 = /^(\s*\r\n){2,}/gm;
			const extraReturns3 = /^\s*$\n/gm;
			const exportClassRegEx = /export *class/g;	
			const exportInterfaceRegEx = /export *interface/g;	

			content = content.replace(extraReturns1, '');
			// content = content.replace(extraReturns2, '\r\n');			
			content = content.replace(extraReturns3, '');

			content = content.replace(exportClassRegEx, '\nexport class');
			content = content.replace(exportInterfaceRegEx, '\nexport interface');

			return content;
		}

		const date = new Date();
		const dynamicName = `adb-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
		let channel = vscode.window.createOutputChannel(dynamicName);
		channel.show();
		channel.appendLine("starting ...");

		const configuredView = vscode.workspace.getConfiguration();

		if(vscode.workspace.workspaceFolders !== undefined) {
			let wf = vscode.workspace.workspaceFolders[0].uri.path ;
			let f = vscode.workspace.workspaceFolders[0].uri.fsPath ; 
			channel.appendLine("wf: " + wf);
			channel.appendLine("f: " + f);			
		} else {
			channel.appendLine("no path");		
		}

		const fromPath = configuredView.get('path.from') as string;
		channel.appendLine("From Path: " + fromPath);
		const toPath = configuredView.get('path.to') as string;
		channel.appendLine("To Path: " + toPath);
		const toInterface: boolean = configuredView.get('toInterface') as boolean;
		channel.appendLine("To Interface: " + toInterface);

		const allFiles = await vscode.workspace.findFiles(fromPath + '\\' + '*.*', '**/node_modules/**');
		allFiles.forEach((f) => {
			channel.appendLine(':' + f + f.fsPath);
		});

		try {
			let files: vscode.Uri[] = [];
			const entityFiles = await vscode.workspace.findFiles(fromPath + '\\' + '**/*.entity.ts', '**/node_modules/**');
			files = files.concat(entityFiles);				
			const dtoFiles = await vscode.workspace.findFiles(fromPath + '\\' + '**/*.dto.ts', '**/node_modules/**');
			files = files.concat(dtoFiles);
			const modelFiles = await vscode.workspace.findFiles(fromPath + '\\' + '**/*.model.ts', '**/node_modules/**');
			files = files.concat(modelFiles);	
			const enumFiles = await vscode.workspace.findFiles(fromPath + '\\' + '**/*.enum.ts', '**/node_modules/**');
			files = files.concat(enumFiles);									
			channel.appendLine("files length => " + files.length);

			let workspaceName = vscode.workspace.name; 
			let workspaceFolders = vscode.workspace.workspaceFolders;
			let activeWorkspaceFolder = workspaceFolders?.find((ws) => ws.name === workspaceName);
			let activeWorkspaceFolderFSPath = activeWorkspaceFolder?.uri.fsPath;

			rmdirSync(`${activeWorkspaceFolderFSPath}\\${toPath}`, { recursive: true });

			files.forEach((f, i) => {
				let file = readFileSync(f.fsPath, { encoding: "utf8" });
				let fileFSPath = f.fsPath;
				let filePath = fileFSPath.substr(0, fileFSPath.lastIndexOf("\\"));
				let fileName =  path.basename(f.toString());
				let fileRelativePath = filePath.replace(`${activeWorkspaceFolderFSPath}\\`, '' );
				let fileRelativeCleanPath = fileRelativePath.replace(`${fromPath}\\`, '' );

				file = prepareRegExes(file, toInterface);
				file = checkCharByChar(file);
				file = prepareImports(file);
				file = prepareCommons(file);
				file = formatter(file);				
				// result = prettier.format(result, { semi: true, singleQuote: true, parser: "typescript" });;


				const distFolder = `${activeWorkspaceFolderFSPath}\\${toPath}\\${fileRelativeCleanPath}`;
				if (!existsSync(distFolder)){
					mkdirSync(distFolder, { recursive: true });
				}
				let distFileName = `${distFolder}\\${fileName}`;
				channel.appendLine("file => " + distFileName);
				writeFileSync(distFileName, file);	
				channel.appendLine("CREATED.");
			});
			channel.appendLine(`(${files.length}) files converted successfully.`);
		} catch(e) {
			console.log(e);
			channel.appendLine("try catch err => " + e);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}