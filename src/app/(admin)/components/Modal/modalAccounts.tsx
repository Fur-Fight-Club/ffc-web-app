'use client';
import { useEffect, useState } from 'react';
import { EditUserType, RoleType, editUserSchema } from 'src/model/user.schema';

import { Button, Input, Modal, Radio, Spacer, Text } from '@nextui-org/react';
import { Envelope, IdentificationCard } from '@phosphor-icons/react';
import { ZodError } from 'zod';

export const Modals = (props: {
  visible: boolean;
  closeHandler: any;
  user: EditUserType;
}) => {
  const { visible, closeHandler, user } = props;

  const [formData, setFormData] = useState<EditUserType>(user);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<EditUserType>(
    {} as EditUserType
  );

  const roleOptions: { label: string; value: RoleType }[] = [
    { label: 'Utilisateur', value: 'USER' },
    { label: 'Admin', value: 'ADMIN' },
  ];

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSave = () => {
    if (validateForm()) {
      console.log('save', formData);
      closeHandler();
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
        />
        <Spacer y={0.6} />
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
        />
        <Spacer y={0.6} />
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
        />
        <Spacer y={0.6} />

        <Radio.Group
          label={<Text>Rôles</Text>}
          defaultValue={user.role}
          orientation="horizontal"
        >
          {roleOptions.map((option) => (
            <Radio size="sm" key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto onPress={handleSave} disabled={!isValidate}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
