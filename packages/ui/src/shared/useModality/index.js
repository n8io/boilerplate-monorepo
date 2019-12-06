import { useContext } from 'react';
import { Context } from 'types/context';

const useModality = () => useContext(Context.MODALITY);

export { useModality };
