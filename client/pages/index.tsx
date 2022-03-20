import type { NextPage } from "next";
import RecordList from "../components/recordList";

const Home: NextPage = () => {
  return (
    <div>
      {/* need to pass date props to this component I think */}
      <RecordList />
    </div>
  );
};

export default Home;
