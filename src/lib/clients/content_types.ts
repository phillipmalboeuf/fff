import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArticleFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    auteure?: EntryFieldTypes.EntryLink<TypeMembreSkeleton>;
    categorie?: EntryFieldTypes.EntryLink<TypeCategorieSkeleton>;
    exergue?: EntryFieldTypes.Text;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    corps?: EntryFieldTypes.RichText;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export function isTypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeArticle<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'article'
}

export interface TypeCategorieFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    sousTitre?: EntryFieldTypes.Symbol;
    icon?: EntryFieldTypes.AssetLink;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    couleur?: EntryFieldTypes.Symbol<"Beige" | "Brun" | "Corail" | "Gris" | "Jaune" | "Mauve" | "Or" | "Orange" | "Rose" | "Rouge" | "Vert">;
}

export type TypeCategorieSkeleton = EntrySkeletonType<TypeCategorieFields, "categorie">;
export type TypeCategorie<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCategorieSkeleton, Modifiers, Locales>;

export function isTypeCategorie<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCategorie<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'categorie'
}

export interface TypeHeroFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    sousTitre?: EntryFieldTypes.Symbol;
    couleur?: EntryFieldTypes.Symbol<"Beige" | "Brun" | "Corail" | "Gris" | "Jaune" | "Mauve" | "Or" | "Orange" | "Rose" | "Rouge" | "Vert">;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    fleche?: EntryFieldTypes.Boolean;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export function isTypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHero<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'hero'
}

export interface TypeLienFields {
    titre: EntryFieldTypes.Symbol;
    route?: EntryFieldTypes.Symbol;
    externe?: EntryFieldTypes.Boolean;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    sousLiens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienSkeleton>>;
}

export type TypeLienSkeleton = EntrySkeletonType<TypeLienFields, "lien">;
export type TypeLien<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLienSkeleton, Modifiers, Locales>;

export function isTypeLien<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLien<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'lien'
}

export interface TypeListeFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    sansTitre?: EntryFieldTypes.Boolean;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeLienSkeleton | TypeTextSkeleton>>;
    lien?: EntryFieldTypes.EntryLink<TypeLienSkeleton>;
}

export type TypeListeSkeleton = EntrySkeletonType<TypeListeFields, "liste">;
export type TypeListe<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListeSkeleton, Modifiers, Locales>;

export function isTypeListe<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeListe<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'liste'
}

export interface TypeMembreFields {
    nom: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    poste?: EntryFieldTypes.Symbol;
    quipe?: EntryFieldTypes.EntryLink<TypeCategorieSkeleton>;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    entreprise?: EntryFieldTypes.Symbol;
    website?: EntryFieldTypes.Symbol;
    email?: EntryFieldTypes.Symbol;
}

export type TypeMembreSkeleton = EntrySkeletonType<TypeMembreFields, "membre">;
export type TypeMembre<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMembreSkeleton, Modifiers, Locales>;

export function isTypeMembre<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeMembre<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'membre'
}

export interface TypeNavigationFields {
    id: EntryFieldTypes.Symbol;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienSkeleton>>;
    popup?: EntryFieldTypes.EntryLink<TypeTextSkeleton>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypePageFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeHeroSkeleton | TypeListeSkeleton | TypeNavigationSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeQuestionFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    categorie?: EntryFieldTypes.EntryLink<TypeCategorieSkeleton>;
    corps?: EntryFieldTypes.RichText;
}

export type TypeQuestionSkeleton = EntrySkeletonType<TypeQuestionFields, "question">;
export type TypeQuestion<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeQuestionSkeleton, Modifiers, Locales>;

export function isTypeQuestion<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeQuestion<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'question'
}

export interface TypeTextFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    sansTitre?: EntryFieldTypes.Boolean;
    sousTitre?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    lien?: EntryFieldTypes.EntryLink<TypeLienSkeleton>;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    couleur?: EntryFieldTypes.Symbol<"Beige" | "Brun" | "Corail" | "Gris" | "Jaune" | "Mauve" | "Or" | "Orange" | "Rose" | "Rouge" | "Vert">;
    box?: EntryFieldTypes.Boolean;
    centre?: EntryFieldTypes.Boolean;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
