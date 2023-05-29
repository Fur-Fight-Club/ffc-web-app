'use client';
import { Button, Input, Modal, Radio, Text } from '@nextui-org/react';
import { Envelope, IdentificationCard } from '@phosphor-icons/react';
import { EditUserType, RoleType } from 'src/model/user.schema';

export const Modals = (props: {
  visible: boolean;
  closeHandler: any;
  user: EditUserType;
}) => {
  const { visible, closeHandler, user } = props;

  const roleOptions: { label: string; value: RoleType }[] = [
    { label: 'Utilisateur', value: 'USER' },
    { label: 'Admin', value: 'ADMIN' },
  ];

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
          value={user.firstname}
        />
        <Input
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Nom"
          contentLeft={
            <IdentificationCard size={20} color="#889096" weight="fill" />
          }
          value={user.lastname}
        />
        <Input
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          contentLeft={<Envelope size={20} color="#889096" weight="fill" />}
          value={user.email}
        />

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
        <Button auto onPress={closeHandler}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
