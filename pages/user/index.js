import protectedRoute from "../../components/auth/ProtectedRoute";
import { userApi } from "../../redux/apiStore";
import { Container } from "../../components/Containers";
import Head from "next/head";

function Profile() {
  const { data, isLoading } = userApi.useGetProfileQuery();
  return (
    <Container>
      <Head>
        <title>User Profile</title>
      </Head>
      {/* {JSON.stringify(data)} */}

      {isLoading ? (
        <h3>Loading..</h3>
      ) : (
        <div className="">
          <Detail
            label="Full Name"
            value={`${data?.data.firstName ?? ""} ${
              data?.data?.lastName ?? ""
            }`}
          />
          <Detail label="Email" value={data?.data?.email} />
          <Detail label="Mobile Number" value={data?.data?.mobileNumber} />
        </div>
      )}
    </Container>
  );
}

export default protectedRoute(Profile);

function Detail({ label, value }) {
  return (
    <div className="detail">
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
}
Detail.defaultProps = {
  label: "Label",
  value: "",
};
