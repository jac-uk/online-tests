import PersonalDetails from '@/views/Apply/AccountProfile/PersonalDetails';
import { createTestSubject } from '../../../helpers';

// import { shallowMount } from '@vue/test-utils';
import TextField from '@/components/Form/TextField';
import DateInput from '@/components/Form/DateInput';

// const candidate = {};

xdescribe('@/views/Apply/AccountProfile/PersonalDetails', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject(PersonalDetails, {
      mocks: ['mockStore', 'mockRouter'],
      stubs: [],
      propsData: {},
      });
  });

  describe('template', () => {
    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('contains a <h1>', () => {
      expect(wrapper.contains('h1')).toBe(true);
    });

    it('contains a <form>', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('the <form> contains a "Save and continue" submit button', () => {
      const button = wrapper.find('form button');
      expect(button.element.type).toBe('submit');
      expect(button.text()).toBe('Save and continue');
    });

    it('renders the TextField components', () => {
      expect(wrapper.find(TextField).exists()).toBe(true);
    });

    it('renders the DateInput components', () => {
      expect(wrapper.find(DateInput).exists()).toBe(true);
    });
  });
});
