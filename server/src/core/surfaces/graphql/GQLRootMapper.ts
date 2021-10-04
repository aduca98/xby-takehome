export interface GQLRootMapper<D, R> {
    toGQLRoot: (data: D) => R;
    fromGQLRoot: (data: R) => D;
}
