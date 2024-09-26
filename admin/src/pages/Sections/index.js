import PageLayout from "layouts/PageLayout";
import Button from "components/Button";
import { Link } from "react-router-dom";
import TableData from "./tableData";

function Sections() {
  return (
    <PageLayout
      title={'Sections'}
      action={
        <Button component={Link} to={`/sections/addSection`}>Add Section</Button>
      }
    >
      <TableData/>
    </PageLayout>
  );
}

export default Sections;
