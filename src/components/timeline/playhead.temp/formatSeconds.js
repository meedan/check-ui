const formatSeconds = seconds => {
  const pad = function(num, size) {
    return `000${num}`.slice(size * -1);
  };
  const time = parseFloat(seconds).toFixed(3);
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  var seconds = Math.floor(time - minutes * 60);
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
};

export default formatSeconds;
