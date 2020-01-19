import React from 'react';
import { Body, Breadcrumb, Breadcrumbs, Content, Header } from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const About = () => {
  const t = useTranslate({
    component: 'about',
    namespace: 'about',
  });

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb
            exact={Route.ABOUT.exact}
            isEnd
            text={t('title')}
            to={Route.ABOUT.path}
          />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <h2>Donec quam felis, ultricies nec</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa <strong>strong</strong>. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
            pretium quis, sem. Nulla consequat massa quis enim. Donec pede
            justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
            justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
            dictum felis eu pede mollis pretium. Integer tincidunt. Cras
            dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
            tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
            ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
            tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
            rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
            ullamcorper ultricies nisi.
          </p>
          <h2>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h2>
          <h3>Aenean commodo ligula eget dolor aenean massa</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <h2>Aenean commodo ligula eget dolor aenean massa</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetuer.</li>
            <li>Aenean commodo ligula eget dolor.</li>
            <li>Aenean massa cum sociis natoque penatibus.</li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <h2>Aenean commodo ligula eget dolor aenean massa</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetuer.</li>
            <li>Aenean commodo ligula eget dolor.</li>
            <li>Aenean massa cum sociis natoque penatibus.</li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <h2>Aenean commodo ligula eget dolor aenean massa</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetuer.</li>
            <li>Aenean commodo ligula eget dolor.</li>
            <li>Aenean massa cum sociis natoque penatibus.</li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
        </Body>
      </Content>
    </Page>
  );
};

export { About };
