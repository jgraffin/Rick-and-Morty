const DetailsList = (name: any, episode: any, airDate: any) => {
  return (
    <div>
      <p>
        <strong>Name:</strong>
        {name}
      </p>
      <p>
        <strong>Episode:</strong>
        {episode}
      </p>
      <p>
        <strong>Air date:</strong>
        {airDate}
      </p>
    </div>
  );
};

export default DetailsList;
