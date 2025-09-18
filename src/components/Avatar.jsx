const getDefaultAvatar = (name) =>
  `https://ui-avatars.com/api/?background=random&name=${name || 'User'}`;

const Avatar = ({ url, alt }) => (
  <img
    src={url || getDefaultAvatar(alt)}
    alt={alt}
    title={alt}
    style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      objectFit: 'cover',
      background: '#eee',
      display: 'block',
    }}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = getDefaultAvatar(alt);
    }}
  />
);

export default Avatar;
