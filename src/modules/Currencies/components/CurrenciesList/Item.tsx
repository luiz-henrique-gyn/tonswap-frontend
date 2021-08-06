import * as React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { UserAvatar } from '@/components/common/UserAvatar'
import { CurrencyInfo } from '@/modules/Currencies/types'
import { useTokensCache } from '@/stores/TokensCacheService'
import { getChangesDirection, parseCurrencyBillions } from '@/utils'


type Props = {
    currency: CurrencyInfo;
    idx?: number;
}


export function Item({ currency, idx }: Props): JSX.Element {
    const tokensCache = useTokensCache()

    const token = React.useMemo(() => tokensCache.get(currency.address), [currency.address])

    const price = React.useMemo(() => parseCurrencyBillions(currency.price), [currency.price])
    const volume24h = React.useMemo(() => parseCurrencyBillions(currency.volume24h), [currency.volume24h])
    const tvl = React.useMemo(() => parseCurrencyBillions(currency.tvl), [currency.tvl])

    return (
        <Link to={`/tokens/${currency.address}`} className="list__row">
            <div className="list__cell">{idx}</div>
            <div className="list__cell">
                <div className="list__cell-inner">
                    <div>
                        {token?.icon !== undefined ? (
                            <img src={token.icon} alt={token.name} className="currency-page__token-icon" />
                        ) : (
                            <UserAvatar address={currency?.address} small />
                        )}
                    </div>
                    <div>
                        <h3 className="currencies-list__token-name">
                            {token?.symbol || currency.currency}
                        </h3>
                        <div className="currencies-list__token-subname">
                            {token?.name}
                        </div>
                    </div>
                </div>
            </div>
            <div className="list__cell list__cell--right">
                {price}
            </div>
            <div className="list__cell list__cell--right">
                <div
                    className={classNames('changes-direction', {
                        'changes-direction-up': getChangesDirection(currency.priceChange) > 0,
                        'changes-direction-down': getChangesDirection(currency.priceChange) < 0,
                    })}
                >
                    {currency.priceChange}
                    %
                </div>
            </div>
            <div className="list__cell list__cell--right">
                {volume24h}
            </div>
            <div className="list__cell list__cell--right">
                {tvl}
            </div>
        </Link>
    )
}