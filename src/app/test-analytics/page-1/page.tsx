"use client";
import { Button } from "@components/UI/Button/Button.component";
import { Spacer } from "@nextui-org/react";

export default function TestAnalyticsPage1() {
  return (
    <div>
      <h1>Test Analytics page 1</h1>
      <Button
        analyticsId="btn-test"
        color={"gradient"}
        onPress={() => console.log("I've been pressed!")}
      >
        Test
      </Button>
      <Button
        analyticsId="another-test"
        color={"gradient"}
        onPress={() => console.log("I've been pressed!")}
      >
        Coucou
      </Button>
      <Button
        analyticsId="btn-bruh"
        color={"gradient"}
        onPress={() => console.log("I've been pressed!")}
      >
        BRUH 8^()
      </Button>
      <Button
        analyticsId="btn-emoji"
        color={"gradient"}
        onPress={() => console.log("I've been pressed!")}
      >
        💀
      </Button>
      <Spacer y={1} />
      <Button
        color={"gradient"}
        onPress={() => console.log("I've been pressed!")}
      >
        Default ID
      </Button>
    </div>
  );
}
