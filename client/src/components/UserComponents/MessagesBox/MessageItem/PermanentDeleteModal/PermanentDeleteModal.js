import { useSearchParams, useParams } from "react-router";
import { useDispatch } from "react-redux";

import Modal from "../../../../Utils/Modal/Modal/Modal";

import InputButton from "../../../../Utils/InputButton/InputButton";

import {
  getTimeInDay,
  getDayInYear,
} from "../../../../../utils/dateConfigs/format";

import {
  currentMessageSlice,
  latestMessageSlice,
} from "../../../../../redux/messageSlice";

import { TrashBinSVG } from "../../../../../utils/svgConfigs/SVG";

import userpublic from "../../../../../asset/img/userpublic.png";

import styles from "./PermanentDeleteModal.module.css";

function PermanentDeleteModal({
  visible,
  chosenMessage,
  onClickClosePermantDeleteModal,
}) {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const dispatch = useDispatch();

  const friendImage = searchParams.get("friendImage");
  const friendId = searchParams.get("friendId");

  const friendImageUrl = friendImage === "" ? userpublic : friendImage;
  if (chosenMessage === null) {
    return <></>;
  }

  const { text, images, imagesUrl, receiverName, createdAt, _id } =
    chosenMessage;

  const onClickDelete = () => {
    const graphQLQuery = {
      query: `
        mutation deleteMessageById($messageInput: String!, $receiverId: String!, $senderId: String!){
          deleteMessageById(messageInput:{messageId: $messageInput , receiverId: $receiverId, senderId: $senderId})
        }
      `,
      variables: {
        messageInput: _id,
        receiverId: friendId,
        senderId: params.userid,
      },
    };

    const bodyJSON = JSON.stringify(graphQLQuery);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");

    fetch(process.env.REACT_APP_SERVER_API, {
      method: "POST",
      body: bodyJSON,
      headers: myHeaders,
    })
      .then((jsonResponse) => jsonResponse.json())
      .then((response) => {
        if (response.data.deleteMessageById === undefined) {
        } else {
          dispatch(
            currentMessageSlice.actions.deleteMessage({
              messageId: _id,
            })
          );
          dispatch(
            latestMessageSlice.actions.deleteMessage({
              messageId: _id,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    onClickClosePermantDeleteModal();
  };
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.svgContainer}>
          <TrashBinSVG />
          <p className={styles.svgText}>Permanent Delete</p>
        </div>
        <div className={styles.messageContainer}>
          <div className={styles.headerContainer}>
            <p className={styles.headerText}>
              Send to {friendId === params.userid ? "yourself" : receiverName}
            </p>
            <img src={friendImageUrl} alt="receiver" />
          </div>
          <div>
            <p className={styles.time}>
              {getDayInYear(new Date(Number(createdAt)))} -{" "}
              {getTimeInDay(createdAt)}
            </p>
          </div>
          <div className={styles.messageContent}>
            <p className={styles.messageText}>{text}</p>
          </div>
        </div>
        <div className={styles.simpleTextContainer}>
          <p>
            You are deleting the above message permanently. Once you delete it,
            neither you nor your partner will see it again. And you cannot
            reverse this process.
          </p>
        </div>
        <div className={styles.promptContainer}>
          <p className={styles.textPrompt}>Do you want to continue?</p>
          <div className={styles.buttonContainers}>
            <InputButton
              type={"button"}
              id={"yesDelete"}
              valueButton={""}
              labelText={"Yes"}
              rootContainer={styles.yesButton}
              onClickHandler={onClickDelete}
            />
            <InputButton
              type={"button"}
              id={"noDelete"}
              valueButton={""}
              labelText={"No"}
              rootContainer={styles.noButton}
              onClickHandler={onClickClosePermantDeleteModal}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PermanentDeleteModal;
