import BigNumber from 'bignumber.js'

export function amount(v?: any, decimals: number = 9): string {
    const value = !v ? '0' : v.toString()
    const isZero = value == null || value === '0'
    const parts = !isZero
        ? new BigNumber(value)
            .div(new BigNumber(10).pow(decimals))
            .toString()
            .split('.')
        : ['', '0']

    const strings = [
        parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        // eslint-disable-next-line no-nested-ternary
        parts[1] ? isZero ? '' : `.${parts[1]}` : '',
    ]

    return strings.join('')
}