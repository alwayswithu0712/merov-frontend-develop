export type ICreateBlog = {
    title: IBlog['title'];
    description: IBlog['description'];
    images: IBlog['images'];
};

export type IBlog = {
    id: string;
    title: string;
    description: string;
    images: string[];
    createdAt: Date;
};
