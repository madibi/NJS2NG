
import { Language } from './../../enum/entity/language.entity';
import { Settings } from "./settings.dto";
import { UI } from "./ui.dto";

export class Configuration {
  public language: Language = new Language();  
  public uI: UI = new UI();
  public settings: Settings = new Settings();
}