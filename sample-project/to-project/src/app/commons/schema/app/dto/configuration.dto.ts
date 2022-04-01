import { Language } from './../../enum/entity/language.entity';
import { Settings } from './settings.dto';
import { UI } from './ui.dto';

export interface Configuration {  language: Language;    uI: UI;  settings: Settings;}