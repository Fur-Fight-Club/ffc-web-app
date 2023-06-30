"use client";

import { Card, Col, Row, Text, Button, Spacer } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { applicationState } from "src/store/application/selector";

type ProfilePageProps = {};

const ProfilePage = (props: ProfilePageProps) => {
  const { user } = useSelector(applicationState);

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
            <Card.Body>
              <Row align="center" css={{ m: "$7" }}>
                <Text>Prénom</Text>
                <Spacer x={10} />
                <Text weight={"bold"}>{user.firstname}</Text>
              </Row>
              <Row align="center" css={{ m: "$7" }}>
                <Text>Nom</Text>
                <Spacer x={10} />
                <Text weight={"bold"}>{user.lastname}</Text>
              </Row>
              <Row align="center" css={{ m: "$7" }}>
                <Text>Email</Text>
                <Spacer x={10} />
                <Text weight={"bold"}>{user.email}</Text>
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
              <Row align="center" css={{ m: "$7" }}>
                <Text>Mot de passe</Text>
                <Spacer x={10} />
                <Text weight={"bold"}>*********</Text>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
