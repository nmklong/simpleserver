export const ProductListHeaderItem = ({
    columnId,
    columnLabel,
    toggleSortBy,
    className
}) => (
    <th
        onClick={() => toggleSortBy(columnId)}
        className={className ? className : ''}
    >
        {columnLabel}
    </th>
)
