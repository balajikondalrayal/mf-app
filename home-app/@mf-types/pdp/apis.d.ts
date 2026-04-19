
    export type RemoteKeys = 'pdp/App';
    type PackageType<T> = T extends 'pdp/App' ? typeof import('pdp/App') :any;