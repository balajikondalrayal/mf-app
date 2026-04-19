
    export type RemoteKeys = 'home-app/Header' | 'home-app/Footer';
    type PackageType<T> = T extends 'home-app/Footer' ? typeof import('home-app/Footer') :T extends 'home-app/Header' ? typeof import('home-app/Header') :any;