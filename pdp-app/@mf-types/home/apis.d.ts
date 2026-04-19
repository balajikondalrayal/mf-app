
    export type RemoteKeys = 'home/Header' | 'home/Footer';
    type PackageType<T> = T extends 'home/Footer' ? typeof import('home/Footer') :T extends 'home/Header' ? typeof import('home/Header') :any;