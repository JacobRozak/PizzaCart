import { NOTIFICATION_TYPE, Store } from "react-notifications-component";
export function notification(type: NOTIFICATION_TYPE, title: string, message: string){
    if (type && title && message) {
        Store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 1500,
              onScreen: true
            }
          });
    }
}