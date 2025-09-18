import { countryNameToCode } from '../utils/country';

const FlagCell = ({ country }) => {
  const code = country && countryNameToCode(country.toLowerCase());
  if (!code) {
    return <span style={{ marginRight: 6 }}>{country}</span>;
  }
  return (
    <img
      src={code ? `https://flagcdn.com/24x18/${code}.png` : ''}
      alt={country}
      title={country}
      style={{
        width: 24,
        height: 18,
        borderRadius: 2,
        objectFit: 'cover',
        marginRight: 6,
        verticalAlign: 'middle',
        background: '#eee',
      }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = '';
      }}
    />
  );
};

export default FlagCell;
