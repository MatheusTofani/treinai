import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

/**
 * Agenda uma notificação local.
 * @param {string} title - Título da notificação.
 * @param {string} body - Corpo da notificação.
 * @param {number} seconds - Tempo em segundos até a notificação ser exibida.
 */

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, // Exibe alerta (notificação visível)
      shouldPlaySound: true, // Ativa som
      shouldSetBadge: false, // Atualiza o badge do app
    }),
  });


export async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      Alert.alert('Permissão Necessária', 'As notificações são importantes para lembrar você dos treinos!');
      return false;
    }
  }
  console.log('Permissões concedidas para notificações!');
  return true;
}


export async function scheduleLocalNotification(title, body, seconds) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: true,
      },
      trigger: {
        seconds: 3, // Exibe após X segundos
      },
    });
    console.log(`Notificação agendada para ${seconds} segundos.`);
  }