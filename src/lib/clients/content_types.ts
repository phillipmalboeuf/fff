import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLienFields {
    titre: EntryFieldTypes.Symbol;
    route?: EntryFieldTypes.Symbol;
    externe?: EntryFieldTypes.Boolean;
    sousLiens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienSkeleton>>;
}

export type TypeLienSkeleton = EntrySkeletonType<TypeLienFields, "lien">;
export type TypeLien<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLienSkeleton, Modifiers, Locales>;

export function isTypeLien<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLien<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'lien'
}

export interface TypeNavigationFields {
    id: EntryFieldTypes.Symbol;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}
