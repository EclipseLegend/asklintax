/**
 * ArticleTable — the standard Knowledge Library table (same look as the inline tables in the
 * Foundation guides). First column is emphasised; rows alternate white / cream.
 *
 *   <ArticleTable head={['Form', 'Threshold']} rows={[['FBAR', '$10,000'], ...]} />
 */
export default function ArticleTable({ head, rows }) {
  const cell = { padding: '12px 16px', borderBottom: '1px solid var(--border-l)', verticalAlign: 'top' }
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15.5px' }}>
        <thead>
          <tr style={{ background: 'var(--navy)', color: '#fff' }}>
            {head.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  borderRadius: i === 0 ? '8px 0 0 0' : i === head.length - 1 ? '0 8px 0 0' : undefined,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <td
                  key={j}
                  style={{ ...cell, background: i % 2 === 1 ? 'var(--cream)' : 'white', fontWeight: j === 0 ? 500 : undefined }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
