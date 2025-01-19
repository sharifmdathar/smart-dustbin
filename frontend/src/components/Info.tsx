interface Info {
  message: String;
  status: String;
}

const Info = ({ info }: { info: Info }) => {
  const { message, status } = info;
  const styles = {
    color: status === "error" ? "red" : "green",
  };
  return (
    <div style={styles}>
      {message}
    </div>
  );
};

export default Info;
