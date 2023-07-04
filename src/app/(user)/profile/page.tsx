"use client";

import { Card, Col, Row, Text, Button, Spacer } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import colors from "@styles/_colors.module.scss";
import { CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { Input } from "antd";
import { toast } from "react-hot-toast";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "src/store/application/slice";
import {
  useUpdateEmailMutation,
  usePasswordUpdateMutation,
} from "src/store/user/slice";
import MenuProfile from "../../../components/MenuProfile";

type ProfilePageProps = {};

const ProfilePage = (props: ProfilePageProps) => {
  const { user } = useSelector(applicationState);
  const [visibleFormFirstname, setVisibleFormFirstname] = useState("none");
  const [visibleFormLastname, setVisibleFormLastname] = useState("none");
  const [visibleFormEmail, setVisibleFormEmail] = useState("none");
  const [visibleFormPassword, setVisibleFormPassword] = useState("none");
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [password, setPassword] = useState("");
  const [oldPassword, setOdlPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const [email, setEmail] = useState(user?.email);

  const handleVisibleFormFirstname = () => {
    setVisibleFormFirstname(visibleFormFirstname === "none" ? "flex" : "none");
    setVisibleFormLastname("none");
    setVisibleFormEmail("none");
    setVisibleFormPassword("none");
  };

  const handleVisibleFormLastname = () => {
    setVisibleFormLastname(visibleFormLastname === "none" ? "flex" : "none");
    setVisibleFormFirstname("none");
    setVisibleFormEmail("none");
    setVisibleFormPassword("none");
  };

  const handleVisibleFormEmail = () => {
    setVisibleFormEmail(visibleFormEmail === "none" ? "flex" : "none");
    setVisibleFormFirstname("none");
    setVisibleFormLastname("none");
    setVisibleFormPassword("none");
  };

  const handleVisibleFormPassword = () => {
    setVisibleFormPassword(visibleFormPassword === "none" ? "flex" : "none");
    setVisibleFormFirstname("none");
    setVisibleFormLastname("none");
    setVisibleFormEmail("none");
  };

  const [updateUser, { isSuccess: isSuccessUpate }] = useUpdateUserMutation();
  const { refetch } = useGetUserQuery("");

  const handleUpdateFirstname = () => {
    setVisibleFormFirstname("none");

    updateUser({
      id: user?.id,
      firstname: firstname,
    });
  };

  const handleUpdateLastname = () => {
    setVisibleFormLastname("none");
    updateUser({
      id: user?.id,
      lastname: lastname,
    });
  };

  const [updateEmail] = useUpdateEmailMutation();

  const handleUpdateEmail = () => {
    setVisibleFormEmail("none");

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

  return (
    <div>
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
                  display: visibleFormFirstname === "flex" ? "none" : "flex",
                }}
              >
                <Text>Prénom</Text>
                <Spacer x={10} />
                <Text weight={"bold"}>{user.firstname}</Text>
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button
                    auto
                    css={{ background: "none" }}
                    onClick={() => handleVisibleFormFirstname()}
                  >
                    <CaretRight size={20} color={colors.black} />
                  </Button>
                </Row>
              </Row>
              <Row
                align="center"
                css={{
                  p: "$7",
                  background: colors.secondaryT500,
                  display: visibleFormFirstname,
                }}
              >
                <Text>Prénom</Text>
                <Spacer x={10} />
                <Input
                  placeholder="Prénom"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />{" "}
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button auto onClick={() => handleUpdateFirstname()}>
                    Valider
                  </Button>
                </Row>
              </Row>
              <Row
                align="center"
                css={{
                  p: "$7",
                  display: visibleFormLastname === "flex" ? "none" : "flex",
                }}
              >
                <Text>Nom</Text>
                <Spacer x={10} />
                <Text weight={"bold"}>{user.lastname}</Text>
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button
                    auto
                    css={{ background: "none" }}
                    onClick={() => handleVisibleFormLastname()}
                  >
                    <CaretRight size={20} color={colors.black} />
                  </Button>
                </Row>
              </Row>
              <Row
                align="center"
                css={{
                  p: "$7",
                  background: colors.secondaryT500,
                  display: visibleFormLastname,
                }}
              >
                <Text>Nom</Text>
                <Spacer x={10} />
                <Input
                  placeholder="Prénom"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />{" "}
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button auto onClick={() => handleUpdateLastname()}>
                    Valider
                  </Button>
                </Row>
              </Row>
              <Row
                align="center"
                css={{
                  p: "$7",
                  display: visibleFormEmail === "flex" ? "none" : "flex",
                }}
              >
                <Text>Email</Text>
                <Spacer x={10} />
                <Text weight={"bold"}>{user.email}</Text>
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button
                    auto
                    css={{ background: "none" }}
                    onClick={() => handleVisibleFormEmail()}
                  >
                    <CaretRight size={20} color={colors.black} />
                  </Button>
                </Row>
              </Row>
              <Row
                align="center"
                css={{
                  p: "$7",
                  background: colors.secondaryT500,
                  display: visibleFormEmail,
                }}
              >
                <Text>Email</Text>
                <Spacer x={10} />
                <Input
                  placeholder="Prénom"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button auto onClick={() => handleUpdateEmail()}>
                    Valider
                  </Button>
                </Row>
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
                  display: visibleFormPassword === "flex" ? "none" : "flex",
                }}
              >
                <Text style={{ width: "20rem" }}>Mot de passe</Text>
                <Spacer x={10} />
                <Text weight={"bold"}>********</Text>
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button
                    auto
                    css={{ background: "none" }}
                    onClick={() => handleVisibleFormPassword()}
                  >
                    <CaretRight size={20} color={colors.black} />
                  </Button>
                </Row>
              </Row>
              <Row
                align="center"
                css={{
                  p: "$7",
                  background: colors.secondaryT500,
                  display: visibleFormPassword,
                }}
              >
                <Text style={{ width: "30rem" }}>Mot de passe</Text>
                <Spacer x={5} />
                <Col>
                  <Input
                    style={{ margin: "0.5rem" }}
                    width={"30rem"}
                    placeholder="Ancien mot de passe"
                    onChange={(e) => setOdlPassword(e.target.value)}
                    // type="password"s
                  />
                  <Input
                    style={{ margin: "0.5rem" }}
                    width={"30rem"}
                    placeholder="Nouveau mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                    // type="password"
                  />
                  <Input
                    style={{ margin: "0.5rem" }}
                    width={"30rem"}
                    placeholder="Confirmer mot de passe"
                    onChange={(e) => setVerifPassword(e.target.value)}
                    // type="password"
                  />
                </Col>
                <Spacer x={5} />
                <Row align="flex-end" justify="flex-end">
                  <Button auto onClick={() => handleUpdatePassword()}>
                    Valider
                  </Button>
                </Row>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
