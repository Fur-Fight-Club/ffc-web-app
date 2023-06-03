import { Button, Modal, Row, Text } from '@nextui-org/react';

export const ModalAcceptContent = (props: {
  visible: boolean;
  closeHandler: any;
  accepted: boolean;
  actionName: string;
  actionTarget: string;
}) => {
  const { visible, closeHandler, actionName, actionTarget, accepted } = props;

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Etes vous sûr de vouloir
          <Text b size={18}>
            {' ' + actionName + ' '}
          </Text>
          {actionTarget}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Row justify="space-around">
          <Button color="success" auto>
            Accepter
          </Button>
          <Button color="error" auto>
            Refuser
          </Button>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
