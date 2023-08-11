export function clearInputNumbersForPhone(evt: any): void {
    if (
        (!Number.isNaN(+evt.key) && +evt.key >= 0 && +evt.key <= 9) ||
        evt.key === '+' ||
        evt.which === 8 ||
        evt.which === 46 ||
        evt.which === 37 ||
        evt.which === 39 ||
        evt.which === 0
    ) {
        return;
    }
    evt.preventDefault();
}

export function clearInputNumbersWithDecimals(evt: any, value?: string): void {
    if (
        (!Number.isNaN(+evt.key) && +evt.key >= 0 && +evt.key <= 9) ||
        evt.key === '.' ||
        evt.which === 8 ||
        evt.which === 46 ||
        evt.which === 37 ||
        evt.which === 39 ||
        evt.which === 0
    ) {
        if (value && value.toString().includes('.') && evt.key === '.') {
            evt.preventDefault();
        }
        return;
    }
    evt.preventDefault();
}

export function numbersOnlyWithNDecimals(value: string, decimalsAllowed: number): { changeValue: boolean; newValue: string } {
    if (value.length > 1 && value.includes('.')) {
        const decimal = value.split('.')[1];

        if (decimal.length > decimalsAllowed) {
            const numberFixed = Number(value).toFixed(decimalsAllowed);
            return { changeValue: true, newValue: numberFixed.toString() };
        }
    }
    return { changeValue: false, newValue: value };
}

export function clearInputNumbers(evt: any): void {
    if (
        (!Number.isNaN(+evt.key) && +evt.key >= 0 && +evt.key <= 9) ||
        evt.which === 8 ||
        evt.which === 46 ||
        evt.which === 37 ||
        evt.which === 39 ||
        evt.which === 0
    ) {
        return;
    }
    evt.preventDefault();
}
