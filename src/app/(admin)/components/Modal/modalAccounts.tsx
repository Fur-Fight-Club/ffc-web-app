'use client';
import { Button, Input, Modal, Radio, Text } from '@nextui-org/react';
import { Envelope, IdentificationCard } from '@phosphor-icons/react';
import { EditUserType } from 'src/model/user.schema';

export const Modals = (props: {
  visible: boolean;
  closeHandler: any;
  user: EditUserType;
}) => {
  const { visible, closeHandler, user } = props;

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
          defaultValue="1"
          orientation="horizontal"
        >
          <Radio size="sm" value="1">
            Utilisateur
          </Radio>
          <Radio size="sm" value="2">
            Admin
          </Radio>
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
