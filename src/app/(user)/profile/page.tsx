"use client";

import { Button, Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import { CaretRight, Check, X } from "@phosphor-icons/react";
import colors from "@styles/_colors.module.scss";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import { useGetUserQuery } from "src/store/application/slice";
import {
  usePasswordUpdateMutation,
  useUpdateEmailMutation,
  useUpdateMutation,
} from "src/store/user/slice";
import MenuProfile from "../../../components/MenuProfile";

type ProfilePageProps = {};

const ProfilePage = (props: ProfilePageProps) => {
  const { user } = useSelector(applicationState);

  const [visibleFormFirstname, setVisibleFormFirstname] = useState(false);
  const [visibleFormLastname, setVisibleFormLastname] = useState(false);
  const [visibleFormEmail, setVisibleFormEmail] = useState(false);
  const [visibleFormPassword, setVisibleFormPassword] = useState(false);

  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [password, setPassword] = useState("");
  const [oldPassword, setOdlPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const [email, setEmail] = useState(user?.email);

  const handleVisibleFormFirstname = () => {
    setVisibleFormFirstname(visibleFormFirstname === false ? true : false);
  };
  const handleVisibleFormLastname = () => {
    setVisibleFormLastname(visibleFormLastname === false ? true : false);
  };
  const handleVisibleFormEmail = () => {
    setVisibleFormEmail(visibleFormEmail === false ? true : false);
  };
  const handleVisibleFormPassword = () => {
    setVisibleFormPassword(visibleFormPassword === false ? true : false);
  };

  const [updateUser, { isSuccess: isSuccessUpate }] = useUpdateMutation();
  const { refetch } = useGetUserQuery("");

  const handleUpdateFirstname = () => {
    setVisibleFormFirstname(false);

    updateUser({
      id: user?.id,
      firstname: firstname,
    }).then(() => {
      refetch();
    });
  };

  const handleUpdateLastname = () => {
    setVisibleFormLastname(false);
    updateUser({
      id: user?.id,
      lastname: lastname,
    }).then(() => {
      refetch();
    });
  };

  const [updateEmail] = useUpdateEmailMutation();

  const handleUpdateEmail = () => {
    setVisibleFormEmail(false);

    if (!email) {
      toast.error("Veuillez entrer votre adresse email");
      return;
    }

    updateEmail({ id: user?.id, email: email, oldEmail: user?.email });
  };

  const [updatePassword] = usePasswordUpdateMutation();

  const handleUpdatePassword = () => {
    setVisibleFormPassword("none");

    const strongPasswordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!password || !oldPassword || !verifPassword) {
      toast.error("Veuillez entrer tous les champs");
      return;
    } else if (!password || !verifPassword) {
      toast.error("Veuillez entrer votre mot de passe");
    } else if (password !== verifPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    } else if (!strongPasswordRegex.test(password)) {
      toast.error("Veuillez saisir un mot de passe plus complèxe !");
      return;
    }

    updatePassword({
      id: user?.id,
      oldPassword: oldPassword,
      password: password,
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Row justify="space-between" align="center" css={{ m: "$5" }}>
        <Text h1>Mon Compte</Text>
      </Row>
      <Row>
        <Col span={4} css={{ m: "$5" }}>
          <MenuProfile />
        </Col>
        <Col span={8} css={{ m: "$5" }}>
          <Card>
            <Card.Header>
              <Row align="center" css={{ m: "$5" }}>
                <Text
                  size={"$2xl"}
                  weight={"bold"}
                  css={{ letterSpacing: "$wide" }}
                >
                  Profil
                </Text>
              </Row>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ p: "inherit" }}>
              <Row
                align="center"
                css={{
                  p: "$7",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {!visibleFormFirstname ? (
                  <>
                    <Text>Prénom</Text>
                    <Text weight={"bold"}>{user.firstname}</Text>
                    <Button
                      auto
                      css={{ background: "none" }}
                      onClick={() => handleVisibleFormFirstname()}
                    >
                      <CaretRight size={20} color={colors.black} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Text>Prénom</Text>
                    <Input
                      placeholder="Prénom"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      style={{ width: "200px" }}
                    />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Button
                        auto
                        color="success"
                        icon={<Check size={15} color="white" weight="light" />}
                        onClick={() => handleUpdateFirstname()}
                      />

                      <Spacer x={0.3} />

                      <Button
                        auto
                        color="error"
                        icon={<X size={15} color="white" weight="light" />}
                        onClick={() => handleVisibleFormFirstname()}
                      />
                    </div>
                  </>
                )}
              </Row>
              <Row
                align="center"
                css={{
                  p: "$7",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {!visibleFormLastname ? (
                  <>
                    <Text>Nom</Text>
                    <Text weight={"bold"}>{user.lastname}</Text>

                    <Button
                      auto
                      css={{ background: "none" }}
                      onClick={() => handleVisibleFormLastname()}
                    >
                      <CaretRight size={20} color={colors.black} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Text>Nom</Text>
                    <Spacer x={10} />
                    <Input
                      placeholder="Prénom"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      style={{ width: "200px" }}
                    />{" "}
                    <Spacer x={10} />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Button
                        auto
                        color="success"
                        icon={<Check size={15} color="white" weight="light" />}
                        onClick={() => handleUpdateLastname()}
                      />
                      <Spacer x={0.3} />
                      <Button
                        auto
                        color="error"
                        icon={<X size={15} color="white" weight="light" />}
                        onClick={() => handleVisibleFormLastname()}
                      />
                    </div>
                  </>
                )}
              </Row>

              <Row
                align="center"
                css={{
                  p: "$7",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {!visibleFormEmail ? (
                  <>
                    <Text>Email</Text>
                    <Text weight={"bold"}>{user.email}</Text>

                    <Button
                      auto
                      css={{ background: "none" }}
                      onClick={() => handleVisibleFormEmail()}
                    >
                      <CaretRight size={20} color={colors.black} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Text>Email</Text>
                    <Input
                      placeholder="Prénom"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "250px" }}
                    />

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Button
                        auto
                        color="success"
                        icon={<Check size={15} color="white" weight="light" />}
                        onClick={() => handleUpdateEmail()}
                      />
                      <Spacer x={0.3} />
                      <Button
                        auto
                        color="error"
                        icon={<X size={15} color="white" weight="light" />}
                        onClick={() => handleVisibleFormEmail()}
                      />
                    </div>
                  </>
                )}
              </Row>
            </Card.Body>
          </Card>

          <Card css={{ mt: "$15" }}>
            <Card.Header>
              <Row align="center" css={{ m: "$5" }}>
                <Text
                  size={"$2xl"}
                  weight={"bold"}
                  css={{ letterSpacing: "$wide" }}
                >
                  Sécurité
                </Text>
              </Row>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ p: "inherit" }}>
              <Row
                align="center"
                css={{
                  p: "$7",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {!visibleFormPassword ? (
                  <>
                    <Text style={{ width: "20rem" }}>Mot de passe</Text>
                    <Text weight={"bold"}>********</Text>
                    <Button
                      auto
                      css={{ background: "none" }}
                      onClick={() => handleVisibleFormPassword()}
                    >
                      <CaretRight size={20} color={colors.black} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Text style={{ width: "10rem" }}>Mot de passe</Text>

                    <Col>
                      <Input
                        style={{ margin: "0.5rem", width: "400px" }}
                        placeholder="Ancien mot de passe"
                        onChange={(e) => setOdlPassword(e.target.value)}
                      />
                      <Input
                        style={{ margin: "0.5rem", width: "400px" }}
                        placeholder="Nouveau mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Input
                        style={{ margin: "0.5rem", width: "400px" }}
                        placeholder="Confirmer mot de passe"
                        onChange={(e) => setVerifPassword(e.target.value)}
                      />
                    </Col>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Button
                        auto
                        color="success"
                        icon={<Check size={15} color="white" weight="light" />}
                        onClick={() => handleUpdatePassword()}
                      />
                      <Spacer x={0.3} />
                      <Button
                        auto
                        color="error"
                        icon={<X size={15} color="white" weight="light" />}
                        onClick={() => handleVisibleFormPassword()}
                      />
                    </div>
                  </>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
