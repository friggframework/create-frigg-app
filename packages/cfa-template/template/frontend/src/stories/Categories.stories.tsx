import { Filter } from '../components/Integration';
import { withReactContext } from 'storybook-react-context';
import { CategoryContext } from '../contexts/CategoryContext';

export default {
  component: Filter,
  title: 'Design System/Categories',
  decorators: [
    withReactContext({
      Context: CategoryContext,
    }),
  ],
  args: {
    selectedCategory: 'Recently added',
    setCategory: () => {},
  },
  parameters: {
    reactContext: {
      useProviderValue: (state, args) => args,
    },
  },
};

export const Default = {};
