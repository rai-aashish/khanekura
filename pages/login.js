import { useForm } from "react-hook-form";
import { authApi } from "../helpers/axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Section } from "../components/Containers";
import styles from "../styles/pages/login.module.scss";
import { CategoryCover } from "../components/categories/Categories";
import Link from "next/link";
import { SmallSpinner } from "../components/Spinners";
import { toast } from "react-toastify";
import Head from "next/head";
import {loginUser} from '../redux/userSlice';
import { useDispatch } from "react-redux";

const AxiosError = require("axios-error");

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [blockAction, setBlockAction] = useState(false);
  const [nextPath, setNextPath] = useState("/");
  const [loginFail, setLoginFail] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setNextPath(localStorage.getItem("last-path") ?? "/");
    if (localStorage.getItem("access_token")) router.replace(nextPath);
  }, []);

  const onSubmit = async (data) => {
    data["client_id"] = process.env.NEXT_PUBLIC_CLIENT_ID;
    data["client_secret"] = process.env.NEXT_PUBLIC_CLIENT_SECRET;
    data["grant_type"] = "password";

    try {
      setBlockAction(true);
      const res = await toast.promise(authApi.post("login", data), {
        pending: "Logging in...",
        success: "Logged in successfully",
        error: "Ops! Something went wrong",
      });
      if (res && res.status === 200) {
        localStorage.setItem(
          "access_token",
          `${res.data.token_type} ${res.data.access_token}`
        );

        //delete last path in localstorage upon successfull login
        localStorage.removeItem("last-path");
        setBlockAction(false);
        setLoginFail(null);
        //redirect user to last path saved if available
        router.push(nextPath);
      }
    } catch (error) {
      setBlockAction(false);
      const err = new AxiosError(error);
      if (err.response) {
        //set login fail messages
        setLoginFail(err.response.data.errors);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Khanekura | Login</title>
      </Head>
      <CategoryCover title="Login" />
      <Container>
        <Section.Container>
          <div className={styles["login-form-container"]}>
            <div className={styles["title"]}>
              <span className={styles["current"]}>Login</span>|
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </div>

            <div className={styles["form"]}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["field-container"]}>
                  <label>Email</label>
                  {errors.username?.type === "required" ? (
                    <span className={styles["error"]}>Email is required</span>
                  ) : (
                    errors.username && (
                      <span className={styles["error"]}>Email is invalid</span>
                    )
                  )}
                  <input
                    type="text"
                    {...register("username", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                </div>

                <div className={styles["field-container"]}>
                  {errors.password && (
                    <span className={styles["error"]}>
                      Password is required
                    </span>
                  )}
                  <input
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>

                {loginFail && (
                  <div className={styles["field-container"]}>
                    {loginFail.map((msg, index) => (
                      <span key={index} className={styles["error"]}>
                        {msg.message}
                      </span>
                    ))}
                  </div>
                )}

                <div className={styles["buttons"]}>
                  <button type="submit">
                    {blockAction ? <SmallSpinner size="lg" /> : "Login"}
                  </button>

                  <Link href="/forget-password">
                    <a>Forget Password</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Section.Container>
      </Container>
    </>
  );
}
