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

import { HiddenSVG } from "../../../../../utils/svgConfigs/SVG";

import userpublic from "../../../../../asset/img/userpublic.png";

import styles from "./LocalDeleteModal.module.css";

function LocalDeleteModal({
  visible,
  chosenMessage,
  onClickCloseLocalDeleteModal,
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

  const {
    text,
    images,
    imagesUrl,
    receiverName,
    createdAt,
    _id,
    senderId,
    receiverId,
  } = chosenMessage;

  const onClickDelete = () => {
    // TODO: 2 hidden == delete
    let graphQLQuery;

    if (senderId === params.userid) {
      graphQLQuery = {
        query: `
        mutation UpdateMessageSenderHidden($messageInput: String!){
          updateMessageSenderHidden(messageInput:{messageId: $messageInput})
        }
      `,
        variables: {
          messageInput: _id,
        },
      };
    } else if (receiverId === params.userid) {
      graphQLQuery = {
        query: `
        mutation UpdateMessageReceiverHidden($messageInput: String!){
          updateMessageReceiverHidden(messageInput:{messageId: $messageInput})
        }
      `,
        variables: {
          messageInput: _id,
        },
      };
    }

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
        if (
          response.data.updateMessageSenderHidden === undefined &&
          response.data.updateMessageReceiverHidden === undefined
        ) {
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
    onClickCloseLocalDeleteModal();
  };
  return (
    <Modal visible={visible} overrideStyle={styles.rootContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.svgContainer}>
          <HiddenSVG />
          <p className={styles.svgText}>Local Delete</p>
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
            You are deleting the above message locally. That means once you
            delete it, you cannot see it again but your friend is still able to
            see it. You cannot reverse this process.
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
              onClickHandler={onClickCloseLocalDeleteModal}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LocalDeleteModal;
