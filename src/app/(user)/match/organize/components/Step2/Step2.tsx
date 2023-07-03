"use client";

import CardList from "@components/CardList";
import Input from "@components/UI/Input/Input";
import { Button, Grid, Row, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Arena } from "src/store/arenas/arenas.model";
import { useGetArenasQuery } from "src/store/arenas/slice";
import { createMatchFormState } from "src/store/matches/selector";
import {
  SetDateCreateForm,
  setArenaCreateForm,
  setStepCreateForm,
} from "src/store/matches/slice";
import ArenaCardDetails from "../ArenaCardDetails";
import styles from "./Step2.module.scss";

type Step2Props = {};

const Step2 = (props: Step2Props) => {
  const dispatch = useDispatch();

  const { arena, date } = useSelector(createMatchFormState);
  const { data: arenas, refetch } = useGetArenasQuery();

  const currentDate = new Date().toISOString().slice(0, 16);
  const [inputValue, setInputValue] = useState<any>(currentDate);
  const minDate = new Date().toISOString().slice(0, 16);

  const inputChangeHandler = (e: any) => {
    setInputValue(e.target.value);
    dispatch(SetDateCreateForm(e.target.value));
  };

  const clearInputHandler = () => {
    setInputValue(null);
    dispatch(SetDateCreateForm(null));
  };

  const handleOnClick = (selectedArena: Arena) => {
    arena?.id === selectedArena.id
      ? dispatch(setArenaCreateForm(null))
      : dispatch(setArenaCreateForm(selectedArena));
  };

  const handleStepBack = () => {
    dispatch(setStepCreateForm(0));
  };

  const handleNextStep = () => {
    dispatch(setStepCreateForm(2));
    toast.success("Arène sélectionnée");
  };

  const canGoToNextStep = () => {
    if (!arena) {
      return false;
    }

    if (!date) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div style={{ height: "95%" }}>
      <Grid.Container css={{ height: "100%", position: "relative" }} gap={2}>
        <Grid xs={4}>
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div className={styles.listContainer}>
              <div>Arènes disponibles</div>
              <CardList>
                {arenas?.map((arenaItem) => (
                  <CardList.ArenaItem
                    key={arenaItem.id}
                    arena={arenaItem}
                    onClick={() => handleOnClick(arenaItem)}
                    isSelected={arena?.id === arenaItem.id}
                  />
                ))}
              </CardList>
            </div>
            <Spacer y={2} />
            <div>Plannification du combat</div>
            <div className={styles.dateContainer}>
              <Input
                type="datetime-local"
                min={minDate}
                value={inputValue}
                onChange={inputChangeHandler}
                clearable
                onClearClick={clearInputHandler}
              />
            </div>
          </div>
        </Grid>
        <Grid xs={8}>
          <div style={{ width: "100%" }}>
            <div>Fiche</div>
            {/* @ts-ignore */}
            <ArenaCardDetails arena={arena} />
          </div>
        </Grid>
      </Grid.Container>
      <Row justify="flex-end">
        <Button bordered onClick={handleStepBack}>
          Retour
        </Button>
        <Spacer x={0.5} />
        <Button
          {...(!canGoToNextStep() && { disabled: true })}
          onClick={handleNextStep}
        >
          Suivant
        </Button>
      </Row>
    </div>
  );
};

export default Step2;
