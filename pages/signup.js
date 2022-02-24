import { useForm } from "react-hook-form";
import { authApi } from "../helpers/axios";
import { useState } from "react";
import { Container, Section } from "../components/Containers";
import styles from "../styles/pages/login.module.scss";
import { CategoryCover } from "../components/categories/Categories";
import Link from "next/link";
import { SmallSpinner } from "../components/Spinners";
import { toast } from "react-toastify";
import Head from "next/Head";
const AxiosError = require("axios-error");

export default function Signup() {
  const [blockAction, setBlockAction] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [signUpFail, setSignUpFail] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (blockAction) return;

    if (data.password !== data.confirmPassword) setPasswordsDontMatch(true);
    else setPasswordsDontMatch(false);
    try {
      setBlockAction(true);
      const res = await toast.promise(authApi.post("signup", data), {
        pending: "Signing up user...",
        success: "Signed up user successfully",
        error: "Ops! Something went wrong",
      });
      //signup success
      if (res && res.status === 201) {
        //clear signup fail error mesages
        setSignUpFail(null);
        //set data fro signed up user
        setNewUser(res.data.data);
        setBlockAction(false);
        console.log(res.data);
      }
    } catch (error) {
      //signup fail
      setBlockAction(false);
      const err = new AxiosError(error);
      if (err.response) {
        //set signup fail messages
        setSignUpFail(err.response.data);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Khanekura | Sign Up</title>
      </Head>
      <CategoryCover title="Signup" />
      <Container>
        <Section.Container>
          <div className={styles["login-form-container"]}>
            <div className={styles["title"]}>
              <Link href="/login">
                <a>Login</a>
              </Link>
              |<span className={styles["current"]}>Sign Up </span>
            </div>

            <div className={styles["form"]}>
              {
                /* form */
                !newUser ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* firstname */}
                    <div className={styles["field-container"]}>
                      <label>First Name:</label>
                      {errors.first_name && (
                        <span className={styles["error"]}>
                          First Name is required
                        </span>
                      )}
                      <input
                        type="text"
                        {...register("first_name", { required: true })}
                      />
                    </div>

                    {/* last name */}
                    <div className={styles["field-container"]}>
                      <label>Last Name:</label>
                      {errors.last_name && (
                        <span className={styles["error"]}>
                          Last Name is required
                        </span>
                      )}
                      <input
                        type="text"
                        {...register("last_name", { required: true })}
                      />
                    </div>

                    {/* email */}
                    <div className={styles["field-container"]}>
                      <label>Email:</label>
                      {errors.email?.type === "required" ? (
                        <span className={styles["error"]}>
                          Email is required
                        </span>
                      ) : (
                        errors.email && (
                          <span className={styles["error"]}>
                            Email is invalid
                          </span>
                        )
                      )}
                      <input
                        type="text"
                        {...register("email", {
                          required: true,
                          pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                      />
                    </div>

                    {/* phone number */}
                    <div className={styles["field-container"]}>
                      <label>Mobile Number:</label>
                      {errors.mobile_number && (
                        <span className={styles["error"]}>
                          Mobile Number is required
                        </span>
                      )}
                      <input
                        type="number"
                        {...register("mobile_number", { required: true })}
                      />
                    </div>

                    {/* password */}
                    <div className={styles["field-container"]}>
                      <label>Password:</label>
                      {errors.password && (
                        <span className={styles["error"]}>
                          Password is required
                        </span>
                      )}
                      <input
                        type="password"
                        {...register("password", { required: true })}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {/* confirm password */}
                    <div className={styles["field-container"]}>
                      <label>Confirm Password:</label>
                      {errors.confirm_password && (
                        <span className={styles["error"]}>
                          Confirm password is required
                        </span>
                      )}
                      {passwordsDontMatch && (
                        <span className={styles["error"]}>
                          Passwords don't match
                        </span>
                      )}
                      <input
                        type="password"
                        {...register("confirm_password", { required: true })}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {signUpFail && (
                      <div className={styles["field-container"]}>
                        {signUpFail.errors.map((error, index) => (
                          <span key={index} className={styles["error"]}>
                            {error.message}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* signup button */}
                    <div className={styles["buttons"]}>
                      <button type="submit">
                        {blockAction ? <SmallSpinner size="lg" /> : "Sign up"}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* new user signup success msg */
                  <SignupSuccess user={newUser} />
                )
              }
            </div>
          </div>
        </Section.Container>
      </Container>
    </>
  );
}

function SignupSuccess({ user }) {
  return (
    <div className={styles["signup-success"]}>
      <strong>
        Congratulations! {user.firstName} {user.lastName},
      </strong>{" "}
      your account with email <strong>{user.email} </strong> and mobile number{" "}
      <strong>{user.mobileNumber}</strong> has been successfully registered !
      <div className={styles["buttons"]}>
        <Link href="/login">
          <a>Login Now</a>
        </Link>
      </div>
    </div>
  );
}

SignupSuccess.defaultProps = {
  user: {
    firstName: "--",
    lastName: "--",
    email: "---",
    mobileNumber: "------",
  },
};
