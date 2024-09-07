import PageLayout from "layouts/PageLayout";
import Button from "components/Button";
import { Link } from "react-router-dom";
import TableData from "./tableData";

function Blogs() {
  return (
    <PageLayout
      title={'Tags'}
      action={
        <Button component={Link} to={`/tags/addTags`}>Add Tags</Button>
      }
    >
      <TableData/>
    </PageLayout>
  );
}

export default Blogs;
