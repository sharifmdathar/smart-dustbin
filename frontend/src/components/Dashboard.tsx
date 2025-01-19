interface User {
  fullName: string;
  username: string;
  points: number;
}

const Dashboard = ({ user }: { user: User }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return (
    <>
      <h1>{user.fullName} has {user.points} points</h1>
      <button onClick={handleLogout}>log out</button>
    </>
  );
};
export default Dashboard;
