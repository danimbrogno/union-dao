FROM cimg/rust:1.70-node
USER circleci
WORKDIR /home/circleci/project
RUN mkdir -p circom && \
    git clone https://github.com/iden3/circom.git circom && \
    cd circom && \
    cargo build --release && \
    cargo install --path circom && \
    cd ../
RUN git clone https://github.com/TheBojda/zk-merkle-tree
RUN cd zk-merkle-tree/ && npm install wasm2js
WORKDIR /home/circleci/project/zk-merkle-tree
CMD ["npm", "install"]