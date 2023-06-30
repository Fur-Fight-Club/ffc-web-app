"use client";
import { Button } from "@components/UI/Button/Button.component";
import { Card, Grid, Spacer, Text } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { usePaymentCallbackMutation } from "src/store/application/slice";
import { Callback, RequestFrom } from "src/store/payments/payments.model";
import { useGetUserQuery } from "src/store/application/slice";

export default function PaymentsHook({
  params,
}: {
  params: { callback: Callback; session_id: string };
}) {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestFrom = searchParams.get("requestFrom") as RequestFrom;

  const [paymentCallback] = usePaymentCallbackMutation();

  useEffect(() => {
    paymentCallback({
      session_id: params.session_id,
      callback: params.callback,
    });
  }, []);

  const { refetch } = useGetUserQuery("");
  useEffect(() => {
    if (params.callback === "success") {
      refetch();
    }
  }, [params.callback]);

  return (
    <div>
      <Grid.Container
        css={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {params.callback === "success" && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={50}
            recycle={true}
          />
        )}
        <Grid xs={12} md={3}></Grid>
        <Grid xs={12} md={6}>
          <Card
            css={{
              zIndex: 9999,
            }}
          >
            <Card.Body
              css={{
                padding: "2rem",
              }}
            >
              <Text
                h1
                css={{
                  textAlign: "center",
                }}
              >
                {params.callback === "success" ? "Youpi 🥳" : "Zut... 😔"}
              </Text>
              <Spacer y={3} />
              <Text
                h4
                css={{
                  textAlign: "center",
                }}
              >
                {params.callback === "success"
                  ? "Votre paiement a bien été effectué !"
                  : "Votre paiement n'a pas pu être effectué..."}
              </Text>
              <Spacer y={0.5} />
              <Text
                css={{
                  textAlign: "center",
                }}
              >
                {params.callback === "success"
                  ? "Vous pouvez desormais profiter de vos jetons et parier des maintenant !"
                  : "Veuillez réessayer d'acheter vos jetons"}
              </Text>
              <Spacer y={3} />
              <Button
                onPress={() =>
                  requestFrom === "web"
                    ? router.push("/")
                    : (location.href = "ffc://fury-fight-club/settings")
                }
                auto
                analyticsId="button-payment-callback"
              >
                {requestFrom === "web"
                  ? "Retourner à l'accueil"
                  : "Ouvrir l'application"}
              </Button>
              <Spacer y={1} />
              <Text
                css={{
                  textAlign: "center",
                  color: "#e1e1e1",
                  fontSize: "0.8rem",
                }}
              >
                Transaction {params.session_id}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={3}></Grid>
      </Grid.Container>
    </div>
  );
}
