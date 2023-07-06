/* eslint-disable react/no-unescaped-entities */
"use client";
import * as React from "react";

import { isSameDay, isAfter, startOfDay, isBefore } from "date-fns";
import { Card, Table, Row, Col, Text, User, Image } from "@nextui-org/react";
import { IconButton } from "@components/IconButton";
import "react-circular-progressbar/dist/styles.css";
import { Monster } from "src/store/monsters/monsters.model";
import { convertApiTypeToLogo, getImageByAmount } from "@utils/utils";
import { Calendar, CheckCircle, Eye } from "@phosphor-icons/react";
import Lottie from "lottie-react";
import flame from "@assets/animations/fire.json";
import { useRouter } from "next/navigation";

interface ListMatchProps {
  monsters: Monster[];
}

const ListMatch: React.FunctionComponent<ListMatchProps> = ({ monsters }) => {
  // @ts-ignore
  const allMatches = [];
  const router = useRouter();

  const getMatchStatus = (matchStartDate: string, matchEndDate: string) => {
    const currentDate = new Date();

    const startDate = new Date(matchStartDate);
    const endDate = new Date(matchEndDate);

    if (isSameDay(currentDate, startDate)) {
      return <Lottie style={{ width: "2rem" }} animationData={flame} />;
    } else if (isAfter(startDate, currentDate)) {
      return <Calendar size={20} color="#e4724d" weight="bold" />;
    } else if (isBefore(startDate, currentDate)) {
      return <CheckCircle size={20} color="#44c969" weight="bold" />;
    }
  };

  monsters.forEach((monster) => {
    if (monster.MatchFighter1) {
      monster.MatchFighter1.forEach((match) => {
        allMatches.push({
          ...match,
          // @ts-ignore
          status: getMatchStatus(match?.matchStartDate, match.matchEndDate),
          // @ts-ignore
          monster: match?.Monster1,
        });
      });
    }

    if (monster.MatchFighter2) {
      monster.MatchFighter2.forEach((match) => {
        allMatches.push({
          ...match,
          // @ts-ignore
          status: getMatchStatus(match.matchStartDate, match.matchEndDate),
          // @ts-ignore
          monster: match?.Monster2,
        });
      });
    }
  });

  // @ts-ignore
  allMatches.sort((a, b) => {
    // @ts-ignore
    const dateA: any = new Date(a?.matchStartDate);
    // @ts-ignore
    const dateB: any = new Date(b?.matchStartDate);
    return dateB - dateA;
  });

  const columns = [
    { name: "", uid: "type" },
    { name: "Monstres", uid: "tag" },
    { name: "Montant", uid: "amount" },
    { name: "Status", uid: "credit" },
    { name: "Action", uid: "action" },
  ];

  return (
    <Card>
      <Card.Body css={{ p: "0" }}>
        {allMatches.length > 0 ? (
          <Table shadow={false} selectionMode="none">
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            {/* @ts-ignore */}
            <Table.Body items={allMatches}>
              {(item) => (
                <Table.Row
                  css={{
                    background:
                      item.monster.id == item.fk_winner ? "#f6e8582d" : "",
                  }}
                >
                  <Table.Cell>
                    {/* @ts-ignore */}
                    <Text>{item.monster.id == item.fk_winner ? "🏆" : ""}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <User
                      squared
                      src={item.monster?.picture}
                      name={
                        convertApiTypeToLogo(item.monster?.monster_type) +
                        " " +
                        item.monster.name
                      }
                      css={{ p: 0 }}
                    >
                      <Text
                        b
                        size={13}
                        css={{ tt: "capitalize", color: "$accents7" }}
                      >
                        {/* @ts-ignore */}
                        {item.monster?.weight}{" "}
                        <Text
                          b
                          size={13}
                          weight={"bold"}
                          css={{ color: "#ff9077" }}
                        >
                          KG
                        </Text>
                      </Text>
                    </User>
                  </Table.Cell>
                  <Table.Cell>
                    <Row>
                      <Text
                        b
                        size={14}
                        css={{ tt: "capitalize", color: "$accents7" }}
                      >
                        {/* @ts-ignore */}
                        {item?.entry_cost}
                        <Image
                          width={15}
                          height={15}
                          src={`/images/coins/${getImageByAmount(
                            // @ts-ignore
                            item?.entry_cost
                          )}`}
                          /* @ts-ignore */
                          alt={`Image for amount ${item?.entry_cost}`}
                        />
                      </Text>
                    </Row>
                  </Table.Cell>
                  <Table.Cell>
                    <Col>
                      {/* @ts-ignore */}
                      <Row>{item.status}</Row>
                    </Col>
                  </Table.Cell>
                  <Table.Cell>
                    <IconButton
                      onClick={() => router.push("/match/" + item.id)}
                    >
                      <Eye weight="bold" />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

            <Table.Pagination shadow noMargin align="center" rowsPerPage={4} />
          </Table>
        ) : (
          <Row justify="center">
            <Text weight={"bold"} css={{ mb: "$4" }}>
              Vous n'avez pas encore de transaction faite.
            </Text>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default ListMatch;
