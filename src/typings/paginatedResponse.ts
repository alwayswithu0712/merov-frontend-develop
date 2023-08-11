export interface PaginatedResponse<A> {
    pageCount: number;
    pageSize: number;
    totalCount: number;
    currentPage: number;
    next: number | null;
    previous: number | null;
    response: Array<A>;
}
