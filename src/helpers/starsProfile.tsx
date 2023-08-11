export const showStarsProfile = (rating: number) => {
    const stars: any = [];
    const florStars = Math.floor(rating);
    for (let i = 0; i < florStars; i += 1) {
        stars.push('full');
    }
    if (rating > florStars) {
        stars.push('half');
    }
    if (Math.ceil(rating) < 5) {
        for (let i = Math.ceil(rating); i < 5; i += 1) {
            stars.push('empty');
        }
    }

    return stars;
};
