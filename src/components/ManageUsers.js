import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { UsersTableHeader, UserListItem } from '.';
import { UserListStyles as styles } from '../styles';

class ManageUsers extends PureComponent {
  state = {
    usersData: this.props.usersData,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.usersData !== prevState.usersData) {
      return {
        usersData: nextProps.usersData,
      };
    }
    return null;
  }

  render() {
    const {
      state: { usersData },
      props: { fetchMore, endCursor }
    } = this;

    return (
      <View style={styles.outerView}>
        <UsersTableHeader />
        <FlatList
          data={usersData}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={(index % 2 === 0) ?
                styles.usersView :
                [styles.usersView, styles.listBGColor]}>
              <UserListItem
                id={item.id}
                userId={item.userId}
                name={item.name}
                username={item.username}
                role={item.role}
                status={item.status}
                key={index}
              />
            </View>
          )}
          onEndReached={() => {
            fetchMore({
              variables: { cursor: endCursor },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.usersConnection.edges;
                const pageInfo = fetchMoreResult.usersConnection.pageInfo;

                return newEdges.length
                  ? {
                    usersConnection: {
                      __typename: previousResult.usersConnection.__typename,
                      pageInfo,
                      edges: [...previousResult.usersConnection.edges, ...newEdges],
                    }
                  }
                  : previousResult;
              }
            });
          }}
        />
      </View>
    );
  }
};

export default ManageUsers;

