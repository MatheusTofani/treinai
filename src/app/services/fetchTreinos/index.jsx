import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';

export const fetchTreinos = async (userId) => {
  try {
    const treinosRef = collection(firestore, 'users', userId, 'treinos');
    const snapshot = await getDocs(treinosRef);

    const treinos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();

    const total = treinos.length;
    const noMes = treinos.filter((treino) => {
      const createdAt = treino.createdAt?.toDate();
      return (
        createdAt &&
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      );
    }).length;

    const noDia = treinos.filter((treino) => {
      const createdAt = treino.createdAt?.toDate();
      return (
        createdAt &&
        createdAt.getDate() === currentDay &&
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      );
    }).length;

    return { total, noMes, noDia };
  } catch (error) {
    console.error('Erro ao buscar dados dos treinos:', error.message);
    return { total: 0, noMes: 0, noDia: 0 };
  }
};
