import { ActionUnion, createAction } from '../action-helper';
import { LanguageActionType } from './types';

export const LanguageActions = {
    changeLanguage: (name: string) =>
        createAction(LanguageActionType.CHANGE_LANGUAGE, name),
};

export type LanguageActions = ActionUnion<typeof LanguageActions>;
