import { TankstackComponent } from "@infra/tankstack"
import { RouterProviderComponent } from "@infra/react-router-dom"
import { router } from "@page/router";

const App: React.FC = () => {
  return (
    <TankstackComponent>
      <RouterProviderComponent routes={router}/>
    </TankstackComponent>
  );
}

export default App;
