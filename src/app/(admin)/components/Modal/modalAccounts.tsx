"use client";
import { useEffect, useState } from "react";
import { EditUserType, RoleType, editUserSchema } from "src/model/user.schema";

import { Button } from "@components/UI/Button/Button.component";
import { Input, Modal, Radio, Spacer, Text } from "@nextui-org/react";
import { Envelope, IdentificationCard } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "react-query";
import { patchUser } from "src/app/api/Users/patchUser";
import { useUpdateMutation } from "src/store/user/slice";
import { ZodError } from "zod";

export const Modals = (props: {
  visible: boolean;
  closeHandler: any;
  user: EditUserType;
  refetch: any;
}) => {
  const queryClient = useQueryClient();
  const { visible, closeHandler, user, refetch } = props;

  const [formData, setFormData] = useState<EditUserType>(user);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<EditUserType>(
    {} as EditUserType
  );

  const [updateUserMuation, { data: dataUpdate }] = useUpdateMutation();

  const patchUserMutation = useMutation(patchUser, {
    onSuccess: (isLoading, data) => {
      queryClient.invalidateQueries("user");
      console.log(data);

      closeHandler();
    },
  });

  const roleOptions: { label: string; value: RoleType }[] = [
    { label: "Utilisateur", value: "USER" },
    { label: "Admin", value: "ADMIN" },
  ];

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSave = () => {
    if (validateForm()) {
      updateUserMuation(formData).then(() => {
        refetch();
        closeHandler();
      });
    }
  };

  const validateForm = () => {
    try {
      editUserSchema.parse(formData);
      setFormErrors({} as EditUserType);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleRadioChange = (value: RoleType) => {
    setFormData({ ...formData, role: value });
  };

  useEffect(() => {
    if (validateForm()) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Editer un utilisateur
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Prénom"
          contentLeft={
            <IdentificationCard size={20} color="#889096" weight="fill" />
          }
          value={formData?.firstname}
          onChange={(e) => {
            setFormData({ ...formData, firstname: e.target.value });
          }}
          helperText={formErrors?.firstname}
        />

        <Spacer y={0.2} />

        <Input
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Nom"
          contentLeft={
            <IdentificationCard size={20} color="#889096" weight="fill" />
          }
          value={formData?.lastname}
          onChange={(e) => {
            setFormData({ ...formData, lastname: e.target.value });
          }}
          helperText={formErrors?.lastname}
        />

        <Spacer y={0.2} />

        <Input
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          contentLeft={<Envelope size={20} color="#889096" weight="fill" />}
          value={formData?.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          helperText={formErrors?.email}
        />

        <Spacer y={0.2} />

        <Radio.Group
          label={<Text>Rôles</Text>}
          defaultValue={user.role}
          orientation="horizontal"
          value={formData?.role}
          onChange={handleRadioChange}
        >
          {roleOptions.map((option) => (
            <Radio size="sm" key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          color="error"
          onPress={closeHandler}
          analyticsId="close-modal-account"
        >
          Close
        </Button>
        <Button
          auto
          onPress={handleSave}
          disabled={!isValidate}
          analyticsId="save-moda-account"
        >
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
