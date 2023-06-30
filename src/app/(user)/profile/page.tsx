"use client";

import { Card, Col, Row, Text, Button, Spacer } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";
import colors from "@styles/_colors.module.scss";
import { CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { Input } from "antd";

type ProfilePageProps = {};

const ProfilePage = (props: ProfilePageProps) => {
  const { user } = useSelector(applicationState);
  const [visibleFormFirstname, setVisibleFormFirstname] = useState("none");
  const [visibleFormLastname, setVisibleFormLastname] = useState("none");
  const [visibleFormEmail, setVisibleFormEmail] = useState("none");
  const [visibleFormPassword, setVisibleFormPassword] = useState("none");

  const handleVisibleFormFirstname = () => {
    setVisibleFormFirstname(visibleFormFirstname === "none" ? "flex" : "none");
  };

  const handleVisibleFormLastname = () => {
    setVisibleFormLastname(visibleFormLastname === "none" ? "flex" : "none");
  };

  const handleVisibleFormEmail = () => {
    setVisibleFormEmail(visibleFormEmail === "none" ? "flex" : "none");
  };

  const handleVisibleFormPassword = () => {
    setVisibleFormPassword(visibleFormPassword === "none" ? "flex" : "none");
  };

  return (
    <div>
      <Row justify="space-between" align="center" css={{ m: "$5" }}>
        <Text h1>Mon Compte</Text>
        <Button auto>Se déconnecter</Button>
      </Row>
      <Row>
        <Col span={4} css={{ m: "$5" }}>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Footer></Card.Footer>
            </Card.Body>
          </Card>
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
                <Input placeholder="Prénom" value={user.firstname} />{" "}
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button auto>Valider</Button>
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
                <Input placeholder="Prénom" value={user.lastname} />{" "}
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button auto>Valider</Button>
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
                <Input placeholder="Prénom" value={user.email} />{" "}
                <Spacer x={10} />
                <Row align="flex-end" justify="flex-end">
                  <Button auto>Valider</Button>
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
            <Card.Body>
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
                  />
                  <Input
                    style={{ margin: "0.5rem" }}
                    width={"30rem"}
                    placeholder="Nouveau mot de passe"
                  />
                  <Input
                    style={{ margin: "0.5rem" }}
                    width={"30rem"}
                    placeholder="Confirmer mot de passe"
                  />
                </Col>
                <Spacer x={5} />
                <Row align="flex-end" justify="flex-end">
                  <Button auto>Valider</Button>
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
